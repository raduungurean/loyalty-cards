<?php

namespace App\Application\Actions\Card;

use App\Application\Actions\ActionPayload;
use Psr\Http\Message\ResponseInterface as Response;

class DeleteCardAction extends CardsAction
{
    protected function action(): Response
    {
        try {
            $cardId = (int)$this->resolveArg('id');
            $card = $this->cardRepository->deleteCardById($cardId);
            return $this->respondWithData($card);
        } catch (\Exception $e) {
            $payload = new ActionPayload(500, ['error' => 'Internal server error']);
            return $this->respond($payload);
        }
    }
}