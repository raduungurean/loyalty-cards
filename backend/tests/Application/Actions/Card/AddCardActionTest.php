<?php

namespace Tests\Application\Actions\Card;

use App\Application\Actions\ActionPayload;
use App\Domain\Card\Card;
use App\Domain\Card\CardRepository;
use DI\Container;
use PDO;
use Tests\CardsTestCase;

class AddCardActionTest extends CardsTestCase
{
    public function testAction()
    {
        $app = $this->getAppInstance();

        /** @var Container $container */
        $container = $app->getContainer();

        $data = [
            'title' => 'catena',
            'description' => 'catena card',
        ];

        $card = Card::builder()
            ->id(1)
            ->title($data['title'])
            ->description($data['description'])
            ->build();

        $cardRepositoryProphecy = $this->prophesize(CardRepository::class);

        $cardRepositoryProphecy
            ->findCardOfId(1)
            ->willReturn($card)
            ->shouldBeCalledOnce();

        $cardRepositoryProphecy
            ->addCard($data, 1)
            ->willReturn(1)
            ->shouldBeCalledOnce();

//        $cardRepositoryProphecy
//            ->setIconForCard(1, 1, 'icon.png')
//            ->shouldBeCalledOnce();

        $pdo = $this->prophesize(PDO::class);
        $container->set(PDO::class, $pdo->reveal());
        $container->set(CardRepository::class, $cardRepositoryProphecy->reveal());

        $request = $this->createRequest('POST', '/api/cards', [
            'HTTP_ACCEPT' => 'application/json',
            'Authorization' => 'Bearer ' . $this->generateJwtToken(),
        ]);
        $request = $request->withParsedBody($data);

        $response = $app->handle($request);
        $payload = (string) $response->getBody();

        $expectedPayload = new ActionPayload(200, ['card' => $card]);
        $serializedPayload = json_encode($expectedPayload, JSON_PRETTY_PRINT);

        $this->assertEquals($serializedPayload, $payload);
    }
}
