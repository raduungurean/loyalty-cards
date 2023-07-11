<?php

namespace App\Application\Actions\Card;

use App\Domain\Card\CardRepository;
use App\Domain\Event\CardWasAdded;
use Psr\Container\ContainerInterface;
use Psr\EventDispatcher\EventDispatcherInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;

class EditCardAction extends CardsAction
{
    protected ContainerInterface $c;
    private EventDispatcherInterface $dispatcher;

    public function __construct(
        LoggerInterface $logger,
        CardRepository $cardRepository,
        ContainerInterface $c,
        EventDispatcherInterface $dispatcher
    ) {
        parent::__construct($logger, $cardRepository);
        $this->c = $c;
        $this->dispatcher = $dispatcher;
    }

    protected function action(): Response
    {
        $data = $this->getFormData();
        $cardId = (int)$this->resolveArg('id');
        $uid = $this->request->getAttribute('uid');
        $uploadedAvatar = $this->request->getUploadedFiles()['avatar'] ?? null;

        if (isset($data['id'])) {
            $this->cardRepository->editCard($data, $uid);
        }

        $event = new CardWasAdded($cardId, $uid, $uploadedAvatar);
        $this->dispatcher->dispatch($event);

        $card = $this->cardRepository->findCardOfId($cardId);

        return $this->respondWithData(['card' => $card]);
    }
}
