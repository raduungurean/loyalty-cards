<?php

namespace App\Application\Actions\Card;

use Psr\Http\Message\ResponseInterface as Response;

class ViewCardAction extends CardsAction
{
    protected function action(): Response
    {
        $cardId = (int) $this->resolveArg('id');
        $card = $this->cardRepository->findCardOfId($cardId);

        return $this->respondWithData($card);
    }
}