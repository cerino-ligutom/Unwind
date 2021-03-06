import React, { useEffect } from 'react';
import { useGlobal } from 'reactn';
import { Container, RoomDetails, RoomName, RoomActions } from './Conversation.styles';
import { ConversationRoom } from '../../models/ConversationRoom';
import { conversationRoomService } from '../../services/conversation-room.service';
import { messageReducer, actions } from '../../reducers/message.reducer';
import { ConversationMessage } from '../ConversationMessage/ConversationMessage';
import ScrollableFeed from 'react-scrollable-feed';
import { LeaveRoom } from '../LeaveRoom/LeaveRoom';
import { CreateRoomInviteCode } from '../CreateRoomInviteCode/CreateRoomInviteCode';

const UNWIND_DEFAULT_CHANNEL_ID = '11111111-1111-1111-1111-111111111111';

interface IConversationProps {
  disconnectFromRoom(roomId: string): any;
}

export const Conversation = ({ disconnectFromRoom }: IConversationProps) => {
  const [conversationRooms] = useGlobal<ConversationRoom[]>('conversationRooms');
  const [activeConversationRoomId] = useGlobal<string>('activeConversationRoomId');
  const dispatch = useGlobal(messageReducer);

  const conversationRoom = conversationRooms.find(room => room.id === activeConversationRoomId);

  useEffect(() => {
    if (activeConversationRoomId && conversationRoom && !conversationRoom.cursor) {
      conversationRoomService.getPreviousMessages(activeConversationRoomId, '').then(data => {
        dispatch(
          actions.addOldMessages({
            conversationRoomId: activeConversationRoomId,
            messages: data.results,
            cursor: data.pageInfo.next,
            hasOldMessages: data.pageInfo.hasNext,
          }),
        );
      });
    }
  }, [activeConversationRoomId]);

  const changeDetectionFilter = (previousProps: any, newProps: any) => {
    return !!conversationRoom && !!conversationRoom.cursor;
  };

  return (
    <>
      {conversationRoom && (
        <>
          <RoomDetails>
            <RoomName>{conversationRoom.name}</RoomName>
            {conversationRoom.id !== UNWIND_DEFAULT_CHANNEL_ID && (
              <>
                <RoomActions>
                  <CreateRoomInviteCode />
                  <LeaveRoom disconnectFromRoom={disconnectFromRoom} />
                </RoomActions>
              </>
            )}
          </RoomDetails>
          <ScrollableFeed forceScroll changeDetectionFilter={changeDetectionFilter}>
            {conversationRoom.messages &&
              conversationRoom.messages.map((message, index, messages) => {
                let isConsecutive = false;

                if (index > 0) {
                  isConsecutive = messages[index-1].senderId === messages[index].senderId;
                }

                return <ConversationMessage key={message.id} message={message} consecutive={isConsecutive} />;
              })}
          </ScrollableFeed>
        </>
      )}
    </>
  );
};
