import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Entry = {
  id: string;
  name: string;
};

type RankableItemProps = {
  entry: Entry;
  position: number;
};

function RankableItem({ entry, position }: RankableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: entry.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      sx={{
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        textAlign:'center',
        gap: 1,
        padding: 1,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        backgroundColor: 'background.default',
        overflow: 'hidden',
      }}
    >
      <Box {...listeners} sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', cursor: 'grab', mr: 1 }}>
        <DragHandleIcon />
      </Box>

      <TextField
        value={entry.name}
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          readOnly: true,
        }}
        sx={{ flex: 2, width: 180 }}
      />

      <Box
        sx={{
          width: 80,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1rem',
        }}
      >
        {5 - position}
      </Box>
    </Box>
  );
}

type RankableItemListProps = {
  entries: Entry[];
};

export default function RankableItemList({ entries: initialEntries }: RankableItemListProps) {
  const [entries, setEntries] = useState(initialEntries);

  const handleDragEnd = ({ active, over }: any) => {
    if (active.id !== over.id) {
      setEntries((prevEntries) => {
        const oldIndex = prevEntries.findIndex((entry) => entry.id === active.id);
        const newIndex = prevEntries.findIndex((entry) => entry.id === over.id);
        return arrayMove(prevEntries, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={entries.map((entry) => entry.id)} strategy={verticalListSortingStrategy}>
        {entries.map((entry, index) => (
          <RankableItem key={entry.id} entry={entry} position={index + 1} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
