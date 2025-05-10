
import React from 'react';
import { CardContent } from '@/components/ui/card';
import SocialLinkList from './social/SocialLinkList';
import SocialLinkForm from './social/SocialLinkForm';
import { useSocialLinks } from './social/useSocialLinks';

const SocialLinkManager = () => {
  const {
    socialLinks,
    editingSocialLink,
    newSocialIcon,
    newSocialHref,
    newSocialAriaLabel,
    newSocialVisible,
    availableSocialIcons,
    setNewSocialIcon,
    setNewSocialHref,
    setNewSocialAriaLabel,
    setNewSocialVisible,
    handleSaveSocialLink,
    handleDeleteSocialLink,
    handleEditSocialLink,
    handleToggleVisibility,
    handleCancelEdit,
    renderSocialIcon
  } = useSocialLinks();

  return (
    <CardContent>
      <div className="space-y-4">
        <SocialLinkList
          socialLinks={socialLinks}
          handleEditSocialLink={handleEditSocialLink}
          handleDeleteSocialLink={handleDeleteSocialLink}
          handleToggleVisibility={handleToggleVisibility}
          renderSocialIcon={renderSocialIcon}
        />

        <SocialLinkForm
          editingSocialLink={editingSocialLink}
          newSocialIcon={newSocialIcon}
          newSocialHref={newSocialHref}
          newSocialAriaLabel={newSocialAriaLabel}
          newSocialVisible={newSocialVisible}
          setNewSocialIcon={setNewSocialIcon}
          setNewSocialHref={setNewSocialHref}
          setNewSocialAriaLabel={setNewSocialAriaLabel}
          setNewSocialVisible={setNewSocialVisible}
          handleSaveSocialLink={handleSaveSocialLink}
          handleCancelEdit={handleCancelEdit}
          availableSocialIcons={availableSocialIcons}
        />
      </div>
    </CardContent>
  );
};

export default SocialLinkManager;
