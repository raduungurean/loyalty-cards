<?php

namespace App\Application\Listeners;

use App\Domain\Card\CardRepository;
use App\Domain\Event\CardWasAdded;
use Psr\Log\LoggerInterface;
use Slim\Psr7\UploadedFile;

class CardAddListener
{
    private CardRepository $cardRepository;
    private string $uploadPath;
    private LoggerInterface $logger;

    public function __construct(CardRepository $cardRepository, string $uploadPath, LoggerInterface $logger)
    {
        $this->cardRepository = $cardRepository;
        $this->uploadPath = $uploadPath;
        $this->logger = $logger;
    }

    public function __invoke(CardWasAdded $event): void
    {
        $uploadedIcon = $event->getUploadedIcon();
        $cardId = $event->getCardId();
        $uid = $event->getUid();

        $filename = '';
        if ($uploadedIcon instanceof UploadedFile && $uploadedIcon->getError() === UPLOAD_ERR_OK) {
            $filename = uniqid('image-', true) . '.' . pathinfo($uploadedIcon->getClientFilename(), PATHINFO_EXTENSION);
            $avatarPath = $this->uploadPath . DIRECTORY_SEPARATOR . $filename;
            $uploadedIcon->moveTo($avatarPath);
        }

        if ($filename) {
            $this->cardRepository->setIconForCard($cardId, $uid, $filename);
        }

    }
}
