<?php

declare(strict_types=1);

namespace Tests\Domain\User;

use App\Domain\User\User;
use Tests\TestCase;

class UserTest extends TestCase
{
    public function userProvider(): array
    {
        return [
            [1, 'elon.musk', 'Elon', 'Musk'],
            [2, 'steve.jobs', 'Steve', 'Jobs'],
            [3, 'mark.zuckerberg', 'Mark', 'Zuckerberg'],
            [4, 'evan.spiegel', 'Evan', 'Spiegel'],
            [5, 'jack.dorsey', 'Jack', 'Dorsey'],
        ];
    }

    /**
     * @dataProvider userProvider
     * @param int    $id
     * @param string $username
     * @param string $firstName
     * @param string $lastName
     */
    public function testGetters(int $id, string $username, string $firstName, string $lastName)
    {
        $user = User::builder()
            ->id($id)
            ->username($username)
            ->firstName($firstName)
            ->lastName($lastName)
            ->build();

        $this->assertEquals($id, $user->getId());
        $this->assertEquals($username, $user->getUsername());
        $this->assertEquals($firstName, $user->getFirstName());
        $this->assertEquals($lastName, $user->getLastName());
    }

    /**
     * @dataProvider userProvider
     * @param int    $id
     * @param string $username
     * @param string $firstName
     * @param string $lastName
     */
    public function testJsonSerialize(int $id, string $username, string $firstName, string $lastName)
    {
        $user = User::builder()
            ->id($id)
            ->username($username)
            ->firstName($firstName)
            ->lastName($lastName)
            ->email('')
            ->token(null)
            ->forgetToken(null)
            ->build();

        $expectedPayload = json_encode([
            'id' => $id,
            'username' => $username,
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => '',
            'token' => null,
            'forgetToken' => null,
        ]);

        $this->assertEquals($expectedPayload, json_encode($user));
    }
}
