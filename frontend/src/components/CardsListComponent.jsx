import Card from './Card';
import React from 'react';

export default function CardsListComponent({
  cards,
  isLoadingEdit,
  openEditModal,
  handleOpenDialog,
}) {
  return (
    <>
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          loading={card.id === isLoadingEdit}
          onEdit={openEditModal}
          onDelete={handleOpenDialog}
        />
      ))}
    </>
  );
}
