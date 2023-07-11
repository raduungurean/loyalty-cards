<?php

declare(strict_types=1);

namespace Tests\Application\Actions\Card;

use App\Application\Actions\ActionError;
use App\Application\Actions\ActionPayload;
use App\Application\Handlers\HttpErrorHandler;
use App\Domain\Card\Card;
use App\Domain\Card\CardNotFoundException;
use App\Domain\Card\CardRepository;
use DI\Container;
use Slim\Middleware\ErrorMiddleware;
use Tests\CardsTestCase;

class ViewCardActionTest extends CardsTestCase
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

        $cardRepositoryProphecy = $this->prophesize(CardRepository::class);
        $cardRepositoryProphecy
            ->findCardOfId(1)
            ->willReturn($card)
            ->shouldBeCalledOnce();

        $container->set(CardRepository::class, $cardRepositoryProphecy->reveal());

        $request = $this->createRequest('GET', '/api/cards/1', [
            'HTTP_ACCEPT' => 'application/json',
            'Authorization' => 'Bearer ' . $this->generateJwtToken(),
        ]);
        $response = $app->handle($request);

        $payload = (string) $response->getBody();
        $expectedPayload = new ActionPayload(200, $card);
        $serializedPayload = json_encode($expectedPayload, JSON_PRETTY_PRINT);

        $this->assertEquals($serializedPayload, $payload);
    }

    public function testActionThrowsCardNotFoundException()
    {
        $app = $this->getAppInstance();

        $callableResolver = $app->getCallableResolver();
        $responseFactory = $app->getResponseFactory();

        $errorHandler = new HttpErrorHandler($callableResolver, $responseFactory);
        $errorMiddleware = new ErrorMiddleware($callableResolver, $responseFactory, true, false, false);
        $errorMiddleware->setDefaultErrorHandler($errorHandler);

        $app->add($errorMiddleware);

        /** @var Container $container */
        $container = $app->getContainer();

        $cardRepositoryProphecy = $this->prophesize(CardRepository::class);
        $cardRepositoryProphecy
            ->findCardOfId(1)
            ->willThrow(new CardNotFoundException())
            ->shouldBeCalledOnce();

        $container->set(CardRepository::class, $cardRepositoryProphecy->reveal());

        $request = $this->createRequest('GET', '/api/cards/1', [
            'HTTP_ACCEPT' => 'application/json',
            'Authorization' => 'Bearer ' . $this->generateJwtToken(),
        ]);
        $response = $app->handle($request);

        $payload = (string) $response->getBody();
        $expectedError = new ActionError(ActionError::RESOURCE_NOT_FOUND, 'The card you requested does not exist.');
        $expectedPayload = new ActionPayload(404, null, $expectedError);
        $serializedPayload = json_encode($expectedPayload, JSON_PRETTY_PRINT);

        $this->assertEquals($serializedPayload, $payload);
    }
}
