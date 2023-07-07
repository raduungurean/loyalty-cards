<?php

namespace App\Application\Actions\Card;

use App\Application\Settings\SettingsInterface;
use App\Domain\Card\CardRepository;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Log\LoggerInterface;
use Slim\Psr7\UploadedFile;

class EditCardAction extends CardsAction
{
    protected ContainerInterface $c;

    public function __construct(LoggerInterface $logger, CardRepository $cardRepository, ContainerInterface $c)
    {
        parent::__construct($logger, $cardRepository);
        $this->c = $c;
    }

    protected function action(): Response
    {
        $data = $this->getFormData();
        $cardId = (int)$this->resolveArg('id');
        $uid = $this->request->getAttribute('uid');

        $avatarPath = '';
        $uploadedAvatar = $this->request->getUploadedFiles()['avatar'] ?? null;
        if ($uploadedAvatar instanceof UploadedFile && $uploadedAvatar->getError() === UPLOAD_ERR_OK) {
            $filename = uniqid('image-', true) . '.' . pathinfo($uploadedAvatar->getClientFilename(), PATHINFO_EXTENSION);
            $settings = $this->c->get(SettingsInterface::class);
            $iconsPath = $settings->get('upload_path');
            $avatarPath = $iconsPath . DIRECTORY_SEPARATOR . $filename;
            $uploadedAvatar->moveTo($avatarPath);
            $data['icon_path'] = $filename;
        }

        if (isset($data['id'])) {
            $this->cardRepository->editCard($data, $uid);
        }
        $card = $this->cardRepository->findCardOfId($cardId);

        return $this->respondWithData(['card' => $card, 'ap' => $avatarPath]);
    }
}