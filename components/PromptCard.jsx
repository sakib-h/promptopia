'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathName, useRouter } from 'react/navigation';
const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
	return <div className="prompt_card">PromptCard</div>;
};

export default PromptCard;
