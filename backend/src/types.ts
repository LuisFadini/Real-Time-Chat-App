export type Message = {
  id: string;
  text: string;
  user: string;
  timestamp: number | string;
};

export type NewUserMessage = {
  id: string;
  userConnected: boolean;
  user: string;
  timestamp: number | string;
};
