export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  create: ({ type, comment, screenshot }: FeedbackCreateData) => Promise<void>;
}