import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { BASE_API_URL } from '../../../../constants';
import Partners from './PartnerCardView';

export default function PartnersManagement({
  partners,
  name,
  email,
  partnerId,
  hotline,
  transportType,
  logoUrl,
  handleUpdatePartnersList,
}) {
  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpenDialog = () => {
    setDialog(true);
  };
  const handleCloseDialog = () => {
    setDialog(false);
  };

  const handleClickActivate = async (partnerId) => {
    setLoading(true);
    const indexPartnerId = partners.findIndex(
      (partner) => partner.id === partnerId,
    );
    try {
      await axios.patch(`${BASE_API_URL}/partners/${partnerId}/activate`, {
        params: {
          partnerId: partnerId,
          isActive: true,
        },
      });
      setLoading(false);
      handleUpdatePartnersList(indexPartnerId);
      toast.success('Update active partner Successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      handleCloseDialog();
    }
  };

  return (
    <Partners
      loading={loading}
      name={name}
      email={email}
      partnerId={partnerId}
      hotline={hotline}
      transportType={transportType}
      logoUrl={logoUrl}
      dialog={dialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
      handleClickActivate={handleClickActivate}
    />
  );
}
