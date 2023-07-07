<?php

namespace App\Application\Actions\Card;

use App\Application\Settings\SettingsInterface;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class GetIconAction
{
    protected ContainerInterface $c;

    public function __construct(
        ContainerInterface $c
    )
    {
        $this->c = $c;
    }

    public function __invoke(Request $request, Response $response, array $args): Response
    {
        $settings = $this->c->get(SettingsInterface::class);
        $iconsPath = $settings->get('upload_path');
        $iconName = $args['icon'];

        try {
            $iconPath = $iconsPath . '/' . $iconName;
            if (file_exists($iconPath)) {
                $imageData = file_get_contents($iconPath);
                $response = $response
                    ->withHeader('Content-Type', 'image/jpeg')
                    ->withHeader('Content-Disposition', 'inline; filename=' . $iconName)
                    ->withHeader('Content-Length', strlen($imageData));

                $response->getBody()->write($imageData);
            }
        } catch (\Exception $e) {
            $response->getBody()->write($e->getTraceAsString());
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(404);
        }

        return $response;
    }
}