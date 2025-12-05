// API 키 관리를 위한 커스텀 훅
import { useState, useEffect } from 'react';
import { validateApiKey, setApiKey as setApiKeyToStorage, hasApiKey as checkHasApiKey } from '../services/api';
import { STORAGE_KEYS } from '../constants/storage';

export const useApiKey = () => {
  const [apiKey, setApiKeyState] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    // 컴포넌트 마운트 시 저장된 API 키 확인
    const savedApiKey = localStorage.getItem(STORAGE_KEYS.TMDB_API_KEY);
    if (savedApiKey) {
      setApiKeyState(savedApiKey);
    }
  }, []);

  const validate = async (key = apiKey) => {
    if (!key || key.trim() === '') {
      setIsValid(false);
      setValidationMessage('API 키를 입력해주세요.');
      return false;
    }

    setIsValidating(true);
    try {
      const result = await validateApiKey(key);
      setIsValid(result.valid);
      setValidationMessage(result.message);
      return result.valid;
    } catch (error) {
      setIsValid(false);
      setValidationMessage('API 키 검증 중 오류가 발생했습니다.');
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const setApiKey = (key) => {
    if (key) {
      setApiKeyToStorage(key);
      setApiKeyState(key);
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem(STORAGE_KEYS.TMDB_API_KEY);
    setApiKeyState('');
    setIsValid(false);
    setValidationMessage('');
  };

  const hasApiKey = () => {
    return checkHasApiKey();
  };

  return {
    apiKey: apiKeyState,
    isValid,
    isValidating,
    validationMessage,
    validate,
    setApiKey,
    clearApiKey,
    hasApiKey
  };
};



