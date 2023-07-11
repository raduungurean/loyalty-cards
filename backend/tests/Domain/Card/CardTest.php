<?php
declare(strict_types=1);

namespace Tests\Domain\Card;

use App\Domain\Card\Card;
use DateTime;
use Tests\TestCase;

class CardTest extends TestCase
{
    public function cardProvider(): array
    {
        return [
            [1, 'catena', 'Catena pharmacy', '8888914727166'],
            [2, 'CCC', 'shoes store', '8888914727133'],
            [3, 'Dr Max', 'drug store', '9988914727133'],
            [4, 'Auchan', 'supermarket', '9988014727133'],
            [5, 'OMV', 'gas station', '9988514727133'],
        ];
    }

    /**
     * @dataProvider cardProvider
     * @param int $id
     * @param string $title
     * @param string $description
     * @param string $barcode
     */
    public function testGetters(int $id, string $title, string $description, string $barcode)
    {
        $card = Card::builder()
            ->id($id)
            ->title($title)
            ->description($description)
            ->barcode($barcode)
            ->build();

        $this->assertEquals($id, $card->getId());
        $this->assertEquals($title, $card->getTitle());
        $this->assertEquals($description, $card->getDescription());
        $this->assertEquals($barcode, $card->getBarcode());
    }

    /**
     * @dataProvider cardProvider
     * @param int $id
     * @param string $title
     * @param string $description
     * @param string $barcode
     */
    public function testJsonSerialize(int $id, string $title, string $description, string $barcode)
    {
        $createdAt = new DateTime();
        $updatedAt = new DateTime();

        $card = Card::builder()
            ->id($id)
            ->title($title)
            ->description($description)
            ->barcode($barcode)
            ->createdAt($createdAt)
            ->updatedAt($updatedAt)
            ->build();

        $expectedPayload = json_encode([
            'id' => $id,
            'uid' => null,
            'title' => $title,
            'color' => null,
            'barcode' => $barcode,
            'icon' => '',
            'description' => $description,
            'created_at' => $createdAt,
            'updated_at' => $updatedAt,
        ]);

        $this->assertEquals($expectedPayload, json_encode($card));
    }
}
