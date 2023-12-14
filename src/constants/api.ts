import { createConsumer } from "@rails/actioncable";

export const API_BASE_URL = 'http://localhost:3001/api';
export const API_WEBSOCKET_URL = 'ws://localhost:3001/cable';
export const consumer = createConsumer(API_WEBSOCKET_URL);