/* eslint-disable react/prop-types */
import React from "react";
import { useAppStore } from "@/store";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    selectedChatType,
    setSelectedChatMessages,
  } = useAppStore();
  
  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className="mt-5">
      {contacts.map((contact) => (
        <div
          key={contact._id} // Add a unique key for each contact
          onClick={() => handleClick(contact)} // Set the click handler
          className={`p-3 rounded-md cursor-pointer ${
            selectedChatData?._id === contact._id
              ? "bg-gray-700" // Highlight selected contact
              : "hover:bg-gray-600"
          }`}
        >
          {/* Customize the display of each contact */}
          <div className="flex items-center space-x-3">
            <img
              src={contact.avatar || "/default-avatar.png"} // Fallback for avatar
              alt={contact.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-white text-sm font-semibold">{contact.name}</p>
              <p className="text-gray-400 text-xs">{contact.status}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
