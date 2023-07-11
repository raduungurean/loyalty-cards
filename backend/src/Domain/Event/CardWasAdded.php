<?php

namespace App\Domain\Event;

class CardWasAdded
{
    private int $cardId;
    private $iconPath;
    private int $uid;

    public function __construct(int $cardId, int $uid, $iconPath)
    {
        $this->cardId = $cardId;
        $this->iconPath = $iconPath;
        $this->uid = $uid;
    }

    /**
     * @return int
     */
    public function getCardId(): int
    {
        return $this->cardId;
    }

    /**
     * @return mixed
     */
    public function getUploadedIcon()
    {
        return $this->iconPath;
    }

    /**
     * @return int
     */
    public function getUid(): int
    {
        return $this->uid;
    }
}
