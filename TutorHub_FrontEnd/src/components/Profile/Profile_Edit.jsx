import '../../styles/Profile/Tutor_Profile.css'

import { useState } from 'react'
import '../../styles/Login_Signup.css'
import { upload } from '../../assets/assets'
import axios from 'axios'

export const Profile_Edit = ({
    setEditMode,

    name,
    email,
    phone,
    bio,
    profilePic,
    shortDescription,
    skill,
    socialMedia,

    setPhone,
    setBio,
    setProfilePic,
    setShortDescription,
    setSkill,
    setSocialMedia,
}) => {
    const [userType, setUserType] = useState('')

    const [inputEmail, setInputEmail] = useState('')
    const [p, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value)
    }

    const [tempPhone, setTempPhone] = useState(phone)
    const [tempBio, setTempBio] = useState(bio)
    const [tempShortDescription, setTempShortDescription] =
        useState(shortDescription)
    const [tempSkill, setTempSkill] = useState(skill)
    const [tempFacebook, setTempFacebook] = useState(socialMedia.facebook)
    const [tempTwitter, setTempTwitter] = useState(socialMedia.twitter)
    const [tempInstagram, setTempInstagram] = useState(socialMedia.instagram)
    const [tempLinkedin, setTempLinkedin] = useState(socialMedia.linkedin)
    const [tempYoutube, setTempYoutube] = useState(socialMedia.youtube)
    const [tempImage, setTempImage] = useState(profilePic)

    const handleProfileChange = async () => {
        try {
            const response = await axios.patch(
                'http://localhost:3000/tutor/update-profile',
                {
                    bio: tempBio,
                    phoneNumber: tempPhone,
                    shortDescription: tempShortDescription,
                    skill: tempSkill,
                    socialMedia: {
                        facebook: tempFacebook,
                        twitter: tempTwitter,
                        instagram: tempInstagram,
                        linkedin: tempLinkedin,
                        youtube: tempYoutube,
                    },
                    imageUrl: tempImage,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            ) // Replace with your API endpoint
            const profileData = response.data
            console.log(profileData)

            setPhone(profileData.phone)
            setBio(profileData.bio)
            setProfilePic(profileData.imageUrl)
            setShortDescription(profileData.shortDescription)
            setSkill(profileData.skill)
            setSocialMedia(
                profileData.socialMedia || {
                    facebook: '',
                    twitter: '',
                    instagram: '',
                    linkedin: '',
                    youtube: '',
                }
            )
            setEditMode(false)
        } catch (error) {
            console.error('Error fetching profile data:', error)
        }
        const profile = {
            name: name,
            email: email,
            phone: phone,
            bio: bio,
            profilePic: profilePic,
            shortDescription: shortDescription,
            skill: skill,
            socialMedia: socialMedia,
        }
    }

    return (
        <div className="login_container">
            <div className="middle">
                <div className="signup-text-cont">
                    <h2>Edit Profile</h2>
                </div>

                <div className="inputs">
                    <div className="login-input">
                        <div>
                            <p>New Phone Number</p>
                            <input
                                type="phone"
                                placeholder="Phone Number"
                                value={tempPhone}
                                onChange={(e) => setTempPhone(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="login-input">
                        <div>
                            <p>Bio</p>
                            <input
                                type="LastName"
                                placeholder="Bio"
                                value={tempBio}
                                onChange={(e) => setTempBio(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="login-input">
                        <div>
                            <p>Short Description</p>
                            <input
                                type="userName"
                                placeholder="Short Description"
                                value={tempShortDescription}
                                onChange={(e) =>
                                    setTempShortDescription(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="login-input">
                        <div>
                            <p>Skill</p>
                            <input
                                type="email"
                                placeholder="Skills"
                                value={tempSkill}
                                onChange={(e) => setTempSkill(e.target.value)}
                            />
                        </div>
                    </div>

                    <p> Social Media </p>

                    <div className="profile-edit-socials-cont">
                        <div className="login-input">
                            <p>FaceBook</p>
                            <input
                                type="p"
                                placeholder="FaceBook"
                                value={tempFacebook}
                                onChange={(e) =>
                                    setTempFacebook(e.target.value)
                                }
                            />
                        </div>
                        <div className="login-input">
                            <p>Twitter</p>
                            <input
                                type="p"
                                placeholder="Twitter"
                                value={tempTwitter}
                                onChange={(e) => setTempTwitter(e.target.value)}
                            />
                        </div>
                        <div className="login-input">
                            <p>Instagram</p>
                            <input
                                type="p"
                                placeholder="Instagram"
                                value={tempInstagram}
                                onChange={(e) =>
                                    setTempInstagram(e.target.value)
                                }
                            />
                        </div>
                        <div className="login-input">
                            <p>LinkedIn</p>
                            <input
                                type="p"
                                placeholder="LinkedIn"
                                value={tempLinkedin}
                                onChange={(e) =>
                                    setTempLinkedin(e.target.value)
                                }
                            />
                        </div>
                        <div className="login-input">
                            <p>Youtube</p>
                            <input
                                type="p"
                                placeholder="Youtube"
                                value={tempYoutube}
                                onChange={(e) => setTempYoutube(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="program-add-input">
                        <p>ProfilePic</p>
                        <div className="upload-box">
                            <input
                                type="file"
                                onChange={(e) => setTempImage(e.target.value)}
                            />
                            <div className="upload-img">
                                <img src={upload} />
                                <p>Click or Drop File</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="signup">
                    <button className="signin" onClick={handleProfileChange}>
                        Change Profile
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile_Edit
