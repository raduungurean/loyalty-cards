import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCard,
  deleteCard,
  editCard,
  fetchCards,
} from '../store/actions/cardsActions';
import Card from '../components/Card';
import { ClipLoader } from 'react-spinners';
import DeleteDialog from '../components/DeleteDialog';
import MessageDialog from '../components/MessageDialog';
import { clearError, clearSuccess } from '../store/reducers/cardsSlice';
import AddCardDialog from '../components/AddCardDialog';
import EditCardDialog from '../components/EditCardDialog';
import * as api from '../api/api';
import * as PropTypes from 'prop-types';

function CardListComponent({
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

const DashboardPage = () => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [avatarDataUrl, setAvatarDataUrl] = useState(null);
  const [description, setDescription] = useState('');
  const [barcode, setBarcode] = useState('');

  const dispatch = useDispatch();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddCardDialog, setShowAddCardDialog] = useState(false);
  const [showEditCardDialog, setShowEditCardDialog] = useState(false);
  const [showErrorDialog, setShowShowErrorDialog] = useState(null);
  const [showSuccessDialog, setShowShowSuccessDialog] = useState(null);
  const [isLoadingEdit, setIsLoadingEdit] = useState(0);

  const [cardId, setCardId] = useState(null);
  const cards = useSelector((state) => state.cards.list);
  const loading = useSelector((state) => state.cards.loading);
  const cardsErrorText = useSelector((state) => state.cards.error);
  const cardsSuccessText = useSelector((state) => state.cards.success);
  const progress = useSelector((state) => state.cards.progress);

  const [detectedBarcode, setDetectedBarcode] = useState(null);
  const [detectedBarcodeType, setDetectedBarcodeType] = useState('');

  const handleBarcodeDetected = (barcode, barcodeType) => {
    setDetectedBarcode(barcode);
    setDetectedBarcodeType(barcodeType);
  };

  const handleCancelBarcode = () => {
    setDetectedBarcode(null);
    setDetectedBarcodeType(null);
  };

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      await dispatch(fetchCards());
    };

    fetchDataFromAPI();
  }, []);

  useEffect(() => {
    if (cardsErrorText) {
      setShowDeleteDialog(false);
      setShowAddCardDialog(false);
      setShowEditCardDialog(false);
      setShowShowErrorDialog(cardsErrorText);
    }
  }, [cardsErrorText]);

  useEffect(() => {
    if (cardsSuccessText) {
      setShowDeleteDialog(false);
      setShowAddCardDialog(false);
      setShowEditCardDialog(false);
      setDescription('');
      setBarcode('');
      setDetectedBarcode(null);
      setTitle('');
      setColor('');
      setCardId(0);
      setAvatarDataUrl(null);
      setShowShowSuccessDialog(cardsSuccessText);
    }
  }, [cardsSuccessText]);

  const openEditModal = async (cardId) => {
    try {
      await setIsLoadingEdit(cardId);
      const cardInfo = await api.getCard(cardId);
      await setIsLoadingEdit(0);
      await setTitle(cardInfo.data.title);
      await setColor(cardInfo.data.color);
      await setDescription(cardInfo.data.description);
      await setBarcode(cardInfo.data.barcode);
      await setCardId(cardId);
      await setShowEditCardDialog(true);
    } catch (error) {
      await setAvatarDataUrl(null);
      await setTitle('');
      await setColor('');
      await setDescription('');
      await setBarcode('');
      await setDetectedBarcode(null);
      await setCardId(null);
      await setIsLoadingEdit(0);
    }
  };

  const openAddCardModal = async () => {
    await setTitle('');
    await setColor('');
    await setDescription('');
    await setBarcode('');
    await setDetectedBarcode(null);
    await setCardId(null);
    await setCardId(null);
    setShowAddCardDialog(true);
  };

  const openDeleteModal = async (cardId) => {
    await dispatch(deleteCard(cardId));
  };

  const handleAddCard = async () => {
    await dispatch(
      addCard({
        title: title,
        description: description,
        barcode: detectedBarcode,
        barcodeType: detectedBarcodeType,
        color: color,
        avatarDataUrl: avatarDataUrl,
      })
    );
  };

  const handleEditCard = async () => {
    await dispatch(
      editCard({
        title: title,
        description: description,
        id: cardId,
        color: color,
        avatarDataUrl: avatarDataUrl,
      })
    );
  };

  const handleOpenDialog = (cardId) => {
    setCardId(cardId);
    setShowDeleteDialog(true);
  };
  const handleCloseDeleteCardDialog = () => {
    setCardId(null);
    setShowDeleteDialog(false);
  };

  const handleCloseAddCardDialog = () => {
    setCardId(null);
    setShowAddCardDialog(false);
  };

  const handleCloseEditCardDialog = () => {
    setCardId(null);
    setShowEditCardDialog(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={50} color="#10B981" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap">
        <CardListComponent
          cards={cards}
          isLoadingEdit={isLoadingEdit}
          openEditModal={openEditModal}
          handleOpenDialog={handleOpenDialog}
        />
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 flex">
          <button
            onClick={openAddCardModal}
            className="flex items-center justify-center bg-blue-500 text-white rounded-lg shadow-lg p-6 w-full h-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Card
          </button>
        </div>
      </div>
      <AddCardDialog
        onAdd={handleAddCard}
        open={showAddCardDialog}
        onClose={handleCloseAddCardDialog}
        progress={progress}
        title={title}
        setTitle={(t) => {
          setTitle(t.target.value);
        }}
        description={description}
        setDescription={(d) => {
          setDescription(d.target.value);
        }}
        color={color}
        setColor={(c) => setColor(c)}
        detectedBarcode={detectedBarcode}
        handleBarcodeDetected={handleBarcodeDetected}
        handleCancelBarcode={handleCancelBarcode}
        setAvatar={(output) => {
          setAvatarDataUrl(output);
        }}
      />
      <EditCardDialog
        onAdd={handleEditCard}
        open={showEditCardDialog}
        onClose={handleCloseEditCardDialog}
        progress={progress}
        title={title}
        setTitle={(t) => {
          setTitle(t.target.value);
        }}
        barcode={barcode}
        description={description}
        setDescription={(d) => {
          setDescription(d.target.value);
        }}
        color={color}
        setColor={(c) => setColor(c)}
        setAvatar={(output) => {
          setAvatarDataUrl(output);
        }}
      />
      <DeleteDialog
        open={showDeleteDialog}
        progress={progress}
        onClose={handleCloseDeleteCardDialog}
        onDelete={() => openDeleteModal(cardId)}
      />
      <MessageDialog
        message={showErrorDialog}
        show={!!showErrorDialog}
        type={'error'}
        onClose={() => {
          setShowShowErrorDialog(null);
          dispatch(clearError());
        }}
      />
      <MessageDialog
        message={showSuccessDialog}
        show={!!showSuccessDialog}
        type={'success'}
        onClose={() => {
          setShowShowSuccessDialog(null);
          dispatch(clearSuccess());
        }}
      />
    </>
  );
};

export default DashboardPage;
