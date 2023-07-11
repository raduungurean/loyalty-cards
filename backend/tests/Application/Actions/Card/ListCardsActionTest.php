<?php

declare(strict_types=1);

namespace Tests\Application\Actions\Card;

use App\Application\Actions\ActionPayload;
use App\Domain\Card\Card;
use App\Domain\Card\CardRepository;
use DI\Container;
use Tests\CardsTestCase;

class ListCardsActionTest extends CardsTestCase
{
    public function testAction()
    {
        $app = $this->getAppInstance();

        /** @var Container $container */
        $container = $app->getContainer();

        $card = Card::builder()
            ->id(1)
            ->title('catena')
            ->description('catena card')
            ->build();

        $cardRepository = $this->prophesize(CardRepository::class);
        $cardRepository
            ->findCardsByUid(1)
            ->willReturn([$card])
            ->shouldBeCalledOnce();

        $container->set(CardRepository::class, $cardRepository->reveal());

        $request = $this->createRequest('GET', '/api/cards', [
            'HTTP_ACCEPT' => 'application/json',
            'Authorization' => 'Bearer ' . $this->generateJwtToken(),
        ]);
        $response = $app->handle($request);

        $payload = (string) $response->getBody();
        $expectedPayload = new ActionPayload(200, [$card]);
        $serializedPayload = json_encode($expectedPayload, JSON_PRETTY_PRINT);

        $this->assertEquals($serializedPayload, $payload);
    }
}
