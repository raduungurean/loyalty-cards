<?php

namespace App\Infrastructure\Persistence\Card;

use App\Domain\Card\Card;
use App\Domain\Card\CardNotFoundException;
use App\Domain\Card\CardRepository;
use PDO;

class DbCardRepository implements CardRepository
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function findAll(): array
    {
        $stmt = $this->db->query('SELECT * FROM cards');
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $cards = [];

        foreach ($data as $row) {
            $card = Card::builder()
                ->fromRow($row)
                ->build();
            $cards[] = $card;
        }

        return $cards;
    }

    public function findCardsByUid(int $uid): array
    {
        $stmt = $this->db->prepare('SELECT * FROM cards WHERE uid = :uid');
        $stmt->bindParam(':uid', $uid, PDO::PARAM_INT);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $cards = [];

        foreach ($data as $row) {
            $card = Card::builder()
                ->fromRow($row)
                ->build();
            $cards[] = $card;
        }

        return $cards;
    }

    /**
     * @throws CardNotFoundException
     */
    public function findCardOfId(int $id): Card
    {
        $stmt = $this->db->prepare('SELECT * FROM cards WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            throw new CardNotFoundException("Card with id $id not found");
        }

        return Card::builder()
            ->fromRow($row)
            ->build();
    }

    public function deleteCardById(int $cardId)
    {
        $stmt = $this->db->prepare('DELETE FROM cards WHERE id = :id');
        $stmt->execute(['id' => $cardId]);
    }

    public function addCard($data, int $uid)
    {
        $stmt = $this->db->prepare('
                INSERT INTO cards (title, color, description, barcode, barcode_type, icon_path, uid, created_at, updated_at)
                VALUES (:title, :color, :description, :barcode, :barcode_type, :icon_path, :uid, NOW(), NOW())
        ');

        $stmt->execute([
            'title' => $data['title'],
            'color' => $data['color'],
            'barcode' => $data['barcode'],
            'barcode_type' => $data['barcodeType'],
            'description' => $data['description'],
            'icon_path' => $data['icon_path'] ?? '',
            'uid' => $uid,
        ]);
        return $this->db->lastInsertId();
    }

    public function editCard($data, int $uid): bool
    {
        $stmt = $this->db->prepare('UPDATE cards SET title = :title, color = :color, icon_path = :icon_path, description = :description, updated_at = NOW() WHERE id = :cardId AND uid = :uid');
        $stmt->execute([
            'title' => $data['title'],
            'color' => $data['color'],
            'description' => $data['description'],
            'cardId' => $data['id'],
            'icon_path' => $data['icon_path'] ?? '',
            'uid' => $uid,
        ]);
        return $stmt->rowCount() > 0;
    }

    public function setIconForCard(int $cardId, int $uid, string $iconPath): bool
    {
        $stmt = $this->db->prepare('UPDATE cards SET icon_path = :icon_path WHERE id = :cardId AND uid = :uid');
        $stmt->execute([
            'cardId' => $cardId,
            'icon_path' => $iconPath,
            'uid' => $uid,
        ]);
        return $stmt->rowCount() > 0;
    }
}
