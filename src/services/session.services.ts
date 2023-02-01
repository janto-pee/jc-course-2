import SessionModel, { SessionInput } from "../models/session.model";

export async function createSession(input: SessionInput) {
  const session = await SessionModel.create(input);
  return session;
}
export async function getSessions() {
  const sessions = await SessionModel.find();
  return sessions;
}
export async function updateSession(sessionId: string, update: SessionInput) {
  const sessions = await SessionModel.findByIdAndUpdate(sessionId, update);
  return sessions;
}
