import { conversationRoomController } from '@app/controllers';
import express from 'express';
import { asyncHandler } from '@app/utils';

const router = express.Router();

router.post('/', asyncHandler(conversationRoomController.create));
router.get('/:id', asyncHandler(conversationRoomController.getById));
router.put('/:id', asyncHandler(conversationRoomController.update));

router.put('/:conversationRoomId/users/:userId', asyncHandler(conversationRoomController.addUserToConversationRoom));
router.delete(
  '/:conversationRoomId/users/:userId',
  asyncHandler(conversationRoomController.removeUserFromConversationRoom),
);

router.put('/invitations/:key', asyncHandler(conversationRoomController.joinByInvitationKey));
router.post('/:conversationRoomId/invitations/', asyncHandler(conversationRoomController.generateInvitationKey));

export const conversationRoomsRouter = router;
