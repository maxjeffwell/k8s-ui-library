export const mockRooms = [
  {
    id: 'room-1',
    title: 'JavaScript Help',
    description: 'Get help with JavaScript questions',
    createdAt: '2024-01-15T10:30:00Z',
    user: { id: '1', username: 'developer' },
  },
  {
    id: 'room-2',
    title: 'React Patterns',
    description: 'Discuss React design patterns and best practices',
    createdAt: '2024-01-16T14:00:00Z',
    user: { id: '2', username: 'alice' },
  },
  {
    id: 'room-3',
    title: 'Code Review',
    description: 'Submit code for peer review',
    createdAt: '2024-01-17T09:15:00Z',
    user: { id: '3', username: 'bob' },
  },
  {
    id: 'room-4',
    title: 'Pair Programming',
    description: 'Find a pair programming partner',
    createdAt: '2024-01-18T16:45:00Z',
    user: { id: '1', username: 'developer' },
  },
];

export const mockMessages = [
  {
    id: 'msg-1',
    text: 'Hey everyone, has anyone worked with WebSocket subscriptions in Apollo?',
    createdAt: '2024-01-18T10:00:00Z',
    user: { id: '1', username: 'developer' },
  },
  {
    id: 'msg-2',
    text: 'Yes! You need to set up a WebSocketLink and split it with HttpLink using the split function.',
    createdAt: '2024-01-18T10:02:30Z',
    user: { id: '2', username: 'alice' },
  },
  {
    id: 'msg-3',
    text: 'Make sure you handle the connection lifecycle properly, especially reconnection logic.',
    createdAt: '2024-01-18T10:05:00Z',
    user: { id: '3', username: 'bob' },
  },
  {
    id: 'msg-4',
    text: 'Thanks! I was also wondering about handling subscription errors gracefully.',
    createdAt: '2024-01-18T10:08:15Z',
    user: { id: '1', username: 'developer' },
  },
  {
    id: 'msg-5',
    text: 'You can use the onError link to catch those. Also check out the subscriptionClient.onDisconnected callback.',
    createdAt: '2024-01-18T10:10:45Z',
    user: { id: '2', username: 'alice' },
  },
  {
    id: 'msg-6',
    text: 'I wrote a small utility for that. Let me paste it in the editor so we can look at it together.',
    createdAt: '2024-01-18T10:12:00Z',
    user: { id: '3', username: 'bob' },
  },
];

export const mockCode = `const express = require('express');
const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const app = express();
const server = http.createServer(app);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app });

  server.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
    console.log('WebSocket subscriptions ready');
  });
});`;

export const mockSession = {
  me: {
    id: '1',
    username: 'developer',
    email: 'dev@codetalk.io',
    role: 'USER',
  },
};
