import '../../styles/Profile/Tutor_Profile.css'
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaYoutube,
    FaGithub,
} from 'react-icons/fa'
import { Email, Phone } from '@mui/icons-material'
import { editIcon } from '../../assets/assets'

function Tutor_Profile_Card({ profile, setEditMode }) {
    return (
        <div>
            <div className="profile-edit-container">
                <h2> Profile Page</h2>
                <button
                    className="edit-profile-but"
                    onClick={() => {
                        setEditMode(true)
                    }}
                >
                    <p>Edit Profile</p>
                    <div className="edit-profile-img-cont">
                        <img
                            className="profile-edit-icon"
                            src={editIcon}
                            alt={profile.name}
                        />
                    </div>
                </button>
            </div>
            <div className="profile-card">
                <div className="profile-header">
                    <img
                        className="profile-pic"
                        src={profile.profilePic}
                        alt={profile.name}
                    />
                    <div className="profile-profile-info">
                        <h2>{profile.name}</h2>
                        <div className="profile-contact-info">
                            <p>
                                <Email className="icon" /> {profile.email}
                            </p>
                            <p>
                                <Phone className="icon" /> {profile.phone}
                            </p>
                        </div>
                        <p className="bio">{profile.bio}</p>
                        <div className="social-icons">
                            <a
                                href={`https://${profile.socialMedia.facebook}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaFacebook />
                            </a>
                            <a
                                href={`https://${profile.socialMedia.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaTwitter />
                            </a>
                            <a
                                href={`https://${profile.socialMedia.instagram}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href={`https://${profile.socialMedia.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedin />
                            </a>
                            <a
                                href={`https://${profile.socialMedia.youtube}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaYoutube />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="description-container-card">
                    <h3>Biography</h3>
                    <p>{profile.shortDescription}</p>
                </div>

                {profile.skill && profile.skill.length > 0 && (
                    <div className="description-container-card">
                        <h3>Skills</h3>
                        <ul>
                            {profile.skill.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Tutor_Profile_Card
