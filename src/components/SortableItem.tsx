import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type SortableItemProps = {
    entry: {
        id: string;
        name: string;
        value?: number;
    };
    onNameChange?: (id: string, newName: string) => void;
    onValueChange?: (id: string, newValue: number) => void;
    onRemove?: (id: string) => void;
    onSave?: (newEntry: { name: string; value: number }) => void;
    isRemoveDisabled?: boolean;
    isNew?: boolean;
};

export default function SortableItem({
    entry,
    onNameChange,
    onValueChange,
    onRemove,
    onSave,
    isRemoveDisabled,
    isNew = false,
}: SortableItemProps) {
    const [name, setName] = useState(entry.name);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: entry.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleSave = () => {
        if (onSave && name.trim()) {
            onSave({ name: name.trim(), value: entry.value ?? 0 });
            setName('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <Box
            ref={setNodeRef}
            style={style}
            {...attributes}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                padding: 1,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                backgroundColor: isNew ? 'grey.100' : 'background.default',
                overflow: 'hidden'
            }}
        >
            {!isNew && (
                <Box {...listeners} sx={{ display: 'flex', alignItems: 'center', cursor: 'grab', mr: 1 }}>
                    <DragHandleIcon />
                </Box>
            )}
            <TextField
                placeholder={isNew ? "Neuer Eintrag" : undefined}
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    if (!isNew && onNameChange) onNameChange(entry.id, e.target.value);
                }}
                onKeyDown={isNew ? handleKeyDown : undefined}
                variant="outlined"
                fullWidth
                size="small"
                sx={{ flex: 2,}}
            />
            {!isNew && entry.value !== undefined && (
                <TextField
                    type="number"
                    value={entry.value}
                    onChange={(e) => onValueChange && onValueChange(entry.id, parseInt(e.target.value) || 0)}
                    variant="outlined"
                    size="small"
                    sx={{ width: 80 }}
                    inputProps={{ step: 5, min: 5 }}
                />
            )}
            {isNew ? (
                <IconButton onClick={handleSave} color="primary" aria-label="Save Entry">
                    <AddIcon />
                </IconButton>
            ) : (
                <IconButton
                    onClick={() => onRemove && onRemove(entry.id)}
                    disabled={isRemoveDisabled}
                    color="error"
                    aria-label="Remove Entry"
                >
                    <DeleteIcon />
                </IconButton>
            )}
        </Box>
    );
}