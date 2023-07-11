<?php

declare(strict_types=1);

namespace App\Domain\Card;

use App\Domain\DomainException\DomainRecordNotFoundException;

class CardNotFoundException extends DomainRecordNotFoundException
{
    public $message = 'The card you requested does not exist.';
}
