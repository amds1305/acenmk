
import React from 'react';
import TeamMemberCard from './TeamMemberCard';
import { TeamMember } from './types';

interface TeamListProps {
  teamMembers: TeamMember[];
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
  memberToDelete: { id: string; name: string } | null;
  setMemberToDelete: React.Dispatch<React.SetStateAction<{ id: string; name: string } | null>>;
}

const TeamList = ({
  teamMembers = [],  // Default to empty array if undefined
  onEdit,
  onDelete,
  memberToDelete,
  setMemberToDelete
}: TeamListProps) => {
  // Check if teamMembers exists and has items
  if (!teamMembers || teamMembers.length === 0) {
    return (
      <div className="text-center p-8 bg-muted/20 rounded-lg border-2 border-dashed">
        <p className="text-muted-foreground mb-2">No team members found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {teamMembers.map((member) => (
        <TeamMemberCard
          key={member.id}
          member={member}
          onEdit={onEdit}
          onDelete={onDelete}
          memberToDelete={memberToDelete}
          setMemberToDelete={setMemberToDelete}
        />
      ))}
    </div>
  );
};

export default TeamList;
