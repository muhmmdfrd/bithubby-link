export interface IFirebaseRequest {
  notification: INotification;
  to: string;
}

interface INotification {
  title: string;
  body: string;
}
