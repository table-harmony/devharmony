import {
  createUser,
  createUserUseCase,
  deleteUser,
  deleteUserUseCase,
} from "@/infrastructure/users";

import { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { Webhook } from "svix";
import { log } from "@/lib/pino";

async function validateRequest(request: Request, secret: string) {
  const payloadString = await request.text();
  const headerPayload = headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };
  const wh = new Webhook(secret);

  try {
    return wh.verify(payloadString, svixHeaders) as WebhookEvent;
  } catch (e) {
    log.error("incoming webhook failed verification");
    return;
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  if (!process.env.CLERK_WEBHOOK_SECRET) {
    throw new Error("CLERK_WEBHOOK_SECRET environment variable is missing");
  }

  const payload = await validateRequest(req, process.env.CLERK_WEBHOOK_SECRET);

  if (!payload) {
    return NextResponse.json(
      { error: "webhook verification failed or payload was malformed" },
      { status: 400 }
    );
  }

  const { type, data } = payload;

  log.trace(`clerk webhook payload: ${{ data, type }}`);

  if (type === "user.created") {
    return createUserAction(data);
  } else if (type === "user.deleted") {
    return deleteUserAction(data.id);
  } else {
    log.warn(
      `${req.url} received event type "${type}", but no handler is defined for this type`
    );
    return NextResponse.json(
      {
        error: `uncreognised payload type: ${type}`,
      },
      {
        status: 400,
      }
    );
  }
}

async function createUserAction(data: UserJSON) {
  log.info("creating user due to clerk webhook");
  await createUserUseCase(
    { createUser: createUser },
    {
      id: data.id,
      name: `${data.first_name} ${data.last_name}`,
      email: data.email_addresses[0].email_address,
      image: data.image_url,
      password: "",
    }
  );
  return NextResponse.json(
    {
      message: "user created",
    },
    { status: 200 }
  );
}

async function deleteUserAction(id?: string) {
  if (id) {
    log.info("delete user due to clerk webhook");
    await deleteUserUseCase({ deleteUser: deleteUser }, { id: id });

    return NextResponse.json(
      {
        message: "user deleted",
      },
      { status: 200 }
    );
  } else {
    log.warn(
      "clerk sent a delete user request, but no user ID was included in the payload"
    );
    return NextResponse.json(
      {
        message: "ok",
      },
      { status: 200 }
    );
  }
}
