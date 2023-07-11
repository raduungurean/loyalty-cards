<?php

namespace App\Application\Actions\Card;

use App\Domain\Card\CardRepository;
use App\Domain\Event\CardWasAdded;
use Psr\Container\ContainerInterface;
use Psr\EventDispatcher\EventDispatcherInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;

class AddCardAction extends CardsAction
{
    protected ContainerInterface $container;
    private EventDispatcherInterface $dispatcher;

    public function __construct(
        LoggerInterface $logger,
        CardRepository $cardRepository,
        ContainerInterface $c,
        EventDispatcherInterface $dispatcher
    ) {
        parent::__construct($logger, $cardRepository);
        $this->container = $c;
        $this->dispatcher = $dispatcher;
    }

    protected function action(): Response
    {
        $data = $this->getFormData();
        $uid = $this->request->getAttribute('uid');
        $uploadedAvatar = $this->request->getUploadedFiles()['avatar'] ?? null;

        $lastInsertId = $this->cardRepository->addCard($data, $uid);

        $event = new CardWasAdded($lastInsertId, $uid, $uploadedAvatar);
        $this->dispatcher->dispatch($event);

        $card = $this->cardRepository->findCardOfId($lastInsertId);

        return $this->respondWithData(['card' => $card]);
    }
}
