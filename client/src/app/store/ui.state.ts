export interface UiState {
    viewMode: 'grid' | 'table';
}

export const initialUiState: UiState = {
    viewMode: 'table',
};
