import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import partnerActions from '../../../../redux/actions/partnerActions';
import CompanyProfile from './CompanyProfile';

function CompanyProfileManagement({
  partner,
  loading,
  changeLogo,
  stillHasVehicle,
}) {
  const [logoFile, setLogoFile] = useState();
  const { register, handleSubmit } = useForm();

  const onLogoChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setLogoFile(undefined);
      return;
    }
    setLogoFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    const logoUrlSections = partner.logoUrl.split('/');
    const oldLogoKey = logoUrlSections[logoUrlSections.length - 1];

    let formData = new FormData();
    formData.append('logo', data.logo[0]);
    formData.append('oldLogoKey', oldLogoKey);

    try {
      await changeLogo(partner.id, formData);
      setLogoFile(undefined);
      toast.success('Change logo successfully!');
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning('Please login again to continue!');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <CompanyProfile
      loading={loading}
      partner={partner}
      register={register}
      logoFile={logoFile}
      onLogoChange={onLogoChange}
      stillHasVehicle={stillHasVehicle}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

function mapStateToProps(state) {
  return {
    partner: state.partner,
    loading: state.apiCallsInProgress > 0,
    stillHasVehicle: state.vehicles.length > 0,
  };
}

const mapDispatchToProps = {
  changeLogo: partnerActions.changeLogo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyProfileManagement);
