export interface IFirebaseResponse {
  success: number;
  result: { message_id: number; error: string }[];
}
