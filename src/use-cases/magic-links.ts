import {
  createMagicLink,
  deleteExpiredMagicLinks,
} from "@/data-access/magic-links";

export async function createMagicLinkUseCase(email: string) {
  const token = await createMagicLink(email);

  return token;
}

export async function deleteExpiredMagicLinksUseCase() {
  await deleteExpiredMagicLinks();
}
