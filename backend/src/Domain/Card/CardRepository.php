<?php

declare(strict_types=1);

namespace App\Domain\Card;

interface CardRepository
{
    /**
     * @return Card[]
     */
    public function findAll(): array;
    public function findCardOfId(int $id): Card;
    /**
     * @return Card[]
     */
    public function findCardsByUid(int $uid): array;
    public function deleteCardById(int $cardId);
    public function addCard($data, int $uid);
    public function editCard(object $data, int $uid): bool;
    public function setIconForCard(int $cardId, int $uid, string $iconPath): bool;
}
