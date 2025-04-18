'use client';

import {useState} from 'react';
import {useSnackbar} from 'notistack';
import {CreateRoomDto} from '@/dtos/create-room.dto';
import {roomsApi} from '@/services';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';

export default function Home() {
    const { enqueueSnackbar } = useSnackbar();
    const [form, setForm] = useState<CreateRoomDto>({
        name: '',
        accessPassword: '',
        adminPassword: '',
    });
    const [loading, setLoading] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            await roomsApi.createRoom(form);
            enqueueSnackbar('Sala criada com sucesso!', { variant: 'success' });
            setForm({ name: '', accessPassword: '', adminPassword: '' });
        } catch {
            enqueueSnackbar('Erro ao criar sala.', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
                <div className="space-y-2">
                    <Label htmlFor="name">Nome da sala</Label>
                    <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="accessPassword">Senha de acesso</Label>
                    <Input
                        id="accessPassword"
                        name="accessPassword"
                        type="password"
                        value={form.accessPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="adminPassword">Senha de admin</Label>
                    <Input
                        id="adminPassword"
                        name="adminPassword"
                        type="password"
                        value={form.adminPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Criando...' : 'Criar Sala'}
                </Button>
            </form>
        </div>
    );
}
