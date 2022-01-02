import React, { useState } from 'react';
import { connect } from 'react-redux';
import AddCarsFormManagement from '../edit/AddCarsFormManagement';
import VehicleEditFormManagement from '../edit/VehicleEditFormManagement';
import JourneyDetailsManagement from '../journey/details/JourneyDetailsManagement';
import JourneyRegistrationFormManagement from '../journey/registraion/JourneyRegistrationFormManagement';
import VehicleRegistrationFormManagement from '../registration/VehicleRegistrationFormManagement';
import CancelRegistrationVehicleManagement from './CancelRegistrationVehicleManagement';
import VehiclesList from './VehiclesList';

function VehiclesManagement({
  classes,
  loading,
  vehicles,
  partnerId,
  transportType,
}) {
  const [chosenVehicleId, setChosenVehicleId] = useState(null);
  const [vehicleRegistrationDialogOpen, setVehicleRegistrationDialogOpen] =
    useState(false);
  const [vehicleEditDialogOpen, setVehicleEditDialogOpen] = useState(false);
  const [journeyRegistrationDialogOpen, setJourneyRegistrationDialogOpen] =
    useState(false);
  const [journeyDetailsDialogOpen, setJourneyDetailsDialogOpen] =
    useState(false);
  const [addCarDialogOpen, setAddCarDialogOpen] = useState(false);
  const [cancelRegistrationDialogOpen, setCancelRegistrationDialogOpen] =
    useState(false);

  const toggleVehicleDialog = () => {
    setVehicleRegistrationDialogOpen(!vehicleRegistrationDialogOpen);
  };

  const openJourneyRegistrationDialog = (id) => {
    setJourneyRegistrationDialogOpen(true);
    setChosenVehicleId(id);
  };

  const closeJourneyRegistrationDialog = () => {
    setJourneyRegistrationDialogOpen(false);
  };

  const openVehicleEditDialog = (id) => {
    setVehicleEditDialogOpen(true);
    setChosenVehicleId(id);
  };

  const closeVehicleEditDialog = () => {
    setVehicleEditDialogOpen(false);
  };

  const openJourneyDetailsDialog = (id) => {
    setJourneyDetailsDialogOpen(true);
    setChosenVehicleId(id);
  };

  const closeJourneyDetailsDialog = () => {
    setJourneyDetailsDialogOpen(false);
  };

  const openAddCarDialog = (id) => {
    setAddCarDialogOpen(true);
    setChosenVehicleId(id);
  };

  const closeAddCarDialog = () => {
    setAddCarDialogOpen(false);
  };

  const openCancelRegistrationDialog = (id) => {
    setChosenVehicleId(id);
    setCancelRegistrationDialogOpen(true);
  };

  const closeCancelRegistrationDialog = () => {
    setCancelRegistrationDialogOpen(false);
  };

  return (
    <>
      <VehiclesList
        loading={loading}
        classes={classes}
        vehicles={vehicles}
        transportType={transportType}
        openAddCarDialog={openAddCarDialog}
        toggleVehicleDialog={toggleVehicleDialog}
        openVehicleEditDialog={openVehicleEditDialog}
        openJourneyDetailsDialog={openJourneyDetailsDialog}
        openCancelRegistrationDialog={openCancelRegistrationDialog}
        openJourneyRegistrationDialog={openJourneyRegistrationDialog}
      />

      <VehicleRegistrationFormManagement
        partnerId={partnerId}
        transportType={transportType}
        toggleDialog={toggleVehicleDialog}
        dialogOpen={vehicleRegistrationDialogOpen}
      />

      <JourneyRegistrationFormManagement
        vehicleId={chosenVehicleId}
        transportType={transportType}
        dialogOpen={journeyRegistrationDialogOpen}
        closeDialog={closeJourneyRegistrationDialog}
      />

      <JourneyDetailsManagement
        vehicleId={chosenVehicleId}
        transportType={transportType}
        dialogOpen={journeyDetailsDialogOpen}
        closeDialog={closeJourneyDetailsDialog}
      />

      <VehicleEditFormManagement
        vehicleId={chosenVehicleId}
        transportType={transportType}
        dialogOpen={vehicleEditDialogOpen}
        closeDialog={closeVehicleEditDialog}
      />

      <AddCarsFormManagement
        vehicleId={chosenVehicleId}
        dialogOpen={addCarDialogOpen}
        closeDialog={closeAddCarDialog}
      />

      <CancelRegistrationVehicleManagement
        chosenVehicleId={chosenVehicleId}
        onClose={closeCancelRegistrationDialog}
        dialogOpen={cancelRegistrationDialogOpen}
      />
    </>
  );
}

function mapStateToProps(state) {
  const { classes, transportType } = state.partner;
  let vehicles = state.vehicles;
  if (vehicles.length && transportType !== 'flights') {
    vehicles = state.vehicles.map((vehicle) => {
      const classIndex = classes.findIndex(
        (eachClass) => eachClass.id === vehicle.classId,
      );
      return { ...vehicle, className: classes[classIndex].name };
    });
  }
  return {
    classes,
    vehicles,
    partnerId: state.partner.id,
    transportType: state.partner.transportType,
    loading: state.apiCallsInProgress > 0,
  };
}

export default connect(mapStateToProps)(VehiclesManagement);
