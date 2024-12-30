import { useState, useEffect } from 'react'

import Tutor_Profile_Card from './Tutor_Profile_Card'
import Profile_Edit from './Profile_Edit'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL;

const Profile = () => {
    const [name, setName] = useState('Robert Fox')
    const [email, setEmail] = useState('info@gmai.com')
    const [phone, setPhone] = useState('+123 9500 600')
    const [bio, setBio] = useState()
    const [profilePic, setProfilePic] = useState(
        'https://via.placeholder.com/100'
    )
    const [shortDescription, setShortDescription] = useState()
    const [skill, setSkill] = useState([])
    const [socialMedia, setSocialMedia] = useState({
        twitter: 'a',
        facebook: 'b',
        instagram: 'c',
        linkedin: 'd',
        youtube: 'e',
    })
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}user/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                ) 
                
                const profileData = response.data

                console.log(profileData)

                setName(profileData.firstName + ' ' + profileData.lastName)
                setEmail(profileData.email)
                setPhone(profileData.phoneNumber)
                setProfilePic(profileData.imageUrl)
                setShortDescription(profileData.shortDescription)
                setSkill(profileData.skills)
                setSocialMedia(
                    profileData.socialMedia || {
                        facebook: '',
                        twitter: '',
                        instagram: '',
                        linkedin: '',
                        youtube: '',
                    }
                )
            } catch (error) {
                console.error('Error fetching profile data:', error)
            }
        }

        fetchProfile()
    }, [])

    const profile = {
        name: name,
        email: email,
        phone: phone,
        bio: bio,
        profilePic: profilePic,
        shortDescription: shortDescription,
        skills: skill,
        socialMedia: socialMedia,
    }

    const [editMode, setEditMode] = useState(false)

    return (
        <div className="profile-page-cont">
            {!editMode && (
                <Tutor_Profile_Card
                    profile={profile}
                    setEditMode={setEditMode}
                />
            )}

            {editMode && (
                <Profile_Edit
                    setEditMode={setEditMode}
                    name={name}
                    email={email}
                    phone={phone}
                    bio={bio}
                    profilePic={profilePic}
                    shortDescription={shortDescription}
                    skill={skill}
                    socialMedia={socialMedia}
                    setPhone={setPhone}
                    setBio={setBio}
                    setProfilePic={setProfilePic}
                    setShortDescription={setShortDescription}
                    setSkill={setSkill}
                    setSocialMedia={setSocialMedia}
                />
            )}
        </div>
    )
}

export default Profile
