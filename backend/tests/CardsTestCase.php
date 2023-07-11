<?php

namespace Tests;

use App\Application\Services\JwtServiceInterface;
use App\Domain\User\User;
use DI\Container;

class CardsTestCase extends TestCase
{
    protected function generateJwtToken(): string
    {
        $app = $this->getAppInstance();

        /** @var Container $container */
        $container = $app->getContainer();

        $jwtService = $container->get(JwtServiceInterface::class);

        $user = User::builder()
            ->id(1)
            ->username('radu')
            ->firstName('Radu')
            ->lastName('Ungurean')
            ->email('radu.ungurean@example.com')
            ->build();

        $tokenPayload = [
            "sub" => $user->getId(),
            "name" => $user->getUsername(),
            "email" => $user->getEmail(),
        ];

        return $jwtService->createToken($tokenPayload);
    }
}
