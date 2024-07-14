import { createFeedback } from "@/data-access/feedbacks";

export async function createFeedbackUseCase(data: {
  userId: number;
  title: string;
  label?: string;
  message?: string;
}) {
  return await createFeedback(data);
}
