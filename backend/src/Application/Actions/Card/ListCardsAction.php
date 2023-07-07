<?php

namespace App\Application\Actions\Card;

use Psr\Http\Message\ResponseInterface as Response;

class ListCardsAction extends CardsAction
{
    protected function action(): Response
    {
        $uid = $this->request->getAttribute('uid');

        $cards = $this->cardRepository->findCardsByUid($uid);

        return $this->respondWithData($cards);
    }
}