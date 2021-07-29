import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import vehicleActions from '../../../../../redux/actions/vehicleActions';
import CancelRegistrationDialog from './CancelRegistrationDialog';

function CancelRegistrationVehicleManagement({
  onClose,
  dialogOpen,
  transportType,
  chosenVehicleId,
  unregisterVehicle,
}) {
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    setLoading(true);
    try {
      await unregisterVehicle(chosenVehicleId, transportType);
      onClose();
      toast.success('Unregister vehicle successfully!');
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 401) {
        toast.warning('Please login again to continue!');
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CancelRegistrationDialog
      loading={loading}
      onClose={onClose}
      onConfirm={onConfirm}
      dialogOpen={dialogOpen}
    />
  );
}

function mapStateToProps(state) {
  return { transportType: state.partner.transportType };
}

const mapDispatchToProps = {
  unregisterVehicle: vehicleActions.unregisterVehicle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CancelRegistrationVehicleManagement);
