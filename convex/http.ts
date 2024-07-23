import { httpRouter } from "convex/server";
import { ConvexError } from "convex/values";

import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

import { formatName } from "./util";

const http = httpRouter();

http.route({
  path: "/clerk",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const payloadString = await request.text();
    const headerPayload = request.headers;

    try {
      const result = await ctx.runAction(internal.clerk.fulfill, {
        payload: payloadString,
        headers: {
          "svix-id": headerPayload.get("svix-id")!,
          "svix-timestamp": headerPayload.get("svix-timestamp")!,
          "svix-signature": headerPayload.get("svix-signature")!,
        },
      });

      switch (result.type) {
        case "user.created":
          await ctx.runMutation(internal.users.createUser, {
            clerkId: result.data.id,
            email: result.data.email_addresses[0]?.email_address,
            name: formatName(result.data.first_name, result.data.last_name),
            image: result.data.image_url,
          });
          break;
        case "user.updated":
          const updatedUser = await ctx.runQuery(
            internal.users.getUserByClerkId,
            {
              clerkId: result.data.id!,
            }
          );

          if (!updatedUser) throw new ConvexError("User does not exist");

          await ctx.runMutation(internal.users.updateUser, {
            userId: updatedUser._id,
            image: result.data.image_url,
          });
          break;
        case "user.deleted":
          const deletedUser = await ctx.runQuery(
            internal.users.getUserByClerkId,
            {
              clerkId: result.data.id!,
            }
          );

          if (!deletedUser) throw new ConvexError("User does not exist");

          await ctx.runMutation(internal.users.deleteUser, {
            userId: deletedUser._id,
          });
          break;
      }

      return new Response(null, {
        status: 200,
      });
    } catch (err) {
      console.error(err);
      return new Response("Webhook Error", {
        status: 400,
      });
    }
  }),
});

export default http;
