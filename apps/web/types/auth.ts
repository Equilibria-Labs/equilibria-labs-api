export type MessageType = 'error' | 'success' | 'message';

export type Message = {
  [K in MessageType]?: string;
};
