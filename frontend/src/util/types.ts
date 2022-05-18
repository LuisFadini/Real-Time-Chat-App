export type Message = {
  id: string;
  text: string;
  user: string;
  timestamp: number;
};

export type NewUserMessage = {
  id: string;
  userConnected: boolean;
  user: string;
  timestamp: number;
};