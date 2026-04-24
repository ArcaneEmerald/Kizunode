import {
    Box,
    Button,
    CircularProgress,
    Divider,
    ImageList,
    ImageListItem,
    Stack,
    Typography,
} from "@mui/material";
import {AddAPhoto, Close} from "@mui/icons-material";
import {useProfile} from "../../lib/hooks/useProfile.ts";
import {useParams} from "react-router";
import {useState} from "react";
import PhotoUploadWidget from "../../app/shared/components/PhotoUploadWidget.tsx";
import StarButton from "../../app/shared/components/StarButton.tsx";
import DeleteButton from "../../app/shared/components/DeleteButton.tsx";

export default function ProfilePhotos() {
    const {id} = useParams();
    const {
        photos, loadingPhotos, isCurrentUser, uploadPhoto,
        setMainPhoto, deletePhoto, profile
    } = useProfile(id);
    const [editMode, setEditMode] = useState(false);

    const handlePhotoUpload = (file: Blob) => {
        uploadPhoto.mutate(file, {
            onSuccess: () => {
                setEditMode(false);
            }
        });
    }

    if (loadingPhotos) {
        return (
            <Stack alignItems="center" sx={{py: 6}}>
                <CircularProgress size={28}/>
            </Stack>
        );
    }

    if (!photos) return <Typography>No photos found for this user</Typography>

    return (
        <Box>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <Typography variant='h5'>Photos</Typography>
                {isCurrentUser && (
                    <Button
                        startIcon={editMode ? <Close/> : <AddAPhoto/>}
                        onClick={() => setEditMode(!editMode)}
                        variant={editMode ? 'text' : 'contained'}
                    >
                        {editMode ? 'Cancel' : 'Add photo'}
                    </Button>
                )}
            </Stack>
            <Divider sx={{my: 2}}/>

            {editMode ? (
                <PhotoUploadWidget
                    uploadPhoto={handlePhotoUpload}
                    loading={uploadPhoto.isPending}
                />
            ) : (
                <>
                    {photos.length === 0 ? (
                        <Typography color="text.secondary">No photos added yet</Typography>
                    ) : (
                        <ImageList sx={{maxHeight: 460, m: 0}} cols={6} rowHeight={170} gap={8}>
                            {photos.map((item) => (
                                <ImageListItem
                                    key={item.id}
                                    sx={{
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        position: 'relative',
                                        '&:hover .photo-actions': {opacity: 1},
                                    }}
                                >
                                    <img
                                        srcSet={`${item.url.replace(
                                            '/upload/',
                                            '/upload/w_170,h_170,c_fill,f_auto,dpr_2,g_face/'
                                        )}`}
                                        src={`${item.url.replace(
                                            '/upload/',
                                            '/upload/w_170,h_170,c_fill,f_auto,g_face/'
                                        )}`}
                                        alt={'user profile image'}
                                        loading="lazy"
                                        style={{borderRadius: 8}}
                                    />
                                    {isCurrentUser && (
                                        <Box
                                            className="photo-actions"
                                            sx={{
                                                position: 'absolute',
                                                inset: 0,
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                justifyContent: 'space-between',
                                                p: 0.5,
                                                opacity: 0,
                                                transition: 'opacity 160ms ease',
                                                background:
                                                    'linear-gradient(to bottom, rgba(0,0,0,0.45), transparent 60%)',
                                                borderRadius: 2,
                                            }}
                                        >
                                            <Box onClick={() => setMainPhoto.mutate(item)}>
                                                <StarButton selected={item.url === profile?.imageUrl}/>
                                            </Box>
                                            {profile?.imageUrl !== item.url && (
                                                <Box onClick={() => deletePhoto.mutate(item.id)}>
                                                    <DeleteButton/>
                                                </Box>
                                            )}
                                        </Box>
                                    )}
                                </ImageListItem>
                            ))}
                        </ImageList>
                    )}
                </>
            )}
        </Box>
    );
}
