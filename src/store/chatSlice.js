import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;
const MESSAGE_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/message`;

const initialState = {
  status: "",
  error: "",
  conversations: [],
  activeConversation: {},
  messages: [],
  notifications: [],
  files: []
};

export const getConversations = createAsyncThunk(
  "conversations/all",
  async (token, { rejectWithValue }) => {
    const response = await axios.get(CONVERSATION_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response);
    const { data } = response;
    return data;
  }
);

export const open_create_conversation = createAsyncThunk(
  "conversations/open_create",
  async (values, { rejectWithValue }) => {
    try {
      const { token, receiver_id, isGroup } = values;
      const { data } = await axios.post(
        CONVERSATION_ENDPOINT,
        { receiver_id, isGroup },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(data);
      return data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);

export const getConversationMessages = createAsyncThunk(
  "conversations/messages",
  async (values, { rejectWithValue }) => {
    try {
      const { token, convo_id } = values;
      const { data } = await axios.get(`${MESSAGE_ENDPOINT}/${convo_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(data);
      return data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "message/send",
  async (values, { rejectWithValue }) => {
    try {
      const { token, message, convo_id, files } = values;
      const { data } = await axios.post(
        `${MESSAGE_ENDPOINT}`,
        { message, convo_id, files },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(data);
      return data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);

export const createGroupConversation = createAsyncThunk(
  "conversations/createGroupConversation",
  async (values, { rejectWithValue }) => {
    try {
      const { token, name, users } = values;
      const { data } = await axios.post(
        `${CONVERSATION_ENDPOINT}/group`,
        { name, users },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return data;
    } catch (error) {
      rejectWithValue(error.response.data.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    updateMessagesAndConversations: (state, action) => {
      // update messages
      let convo = state.activeConversation;
      if (convo._id == action.payload.conversation._id) {
        state.messages = [...state.messages, action.payload];
      }
      //update conversations
      let conversation = {
        ...action.payload.conversation,
        latestMessage: action.payload
      };
      let newConvos = [...state.conversations].filter(
        c => c._id !== conversation._id
      );
      newConvos.unshift(conversation);
      state.conversations = newConvos;
    },
    addFiles: (state, action) => {
      state.files = [...state.files, action.payload];
    },
    clearFiles: (state, action) => {
      state.files = [];
    },
    removeFileFromFiles: (state, action) => {
      let index = action.payload;
      let files = [...state.files];
      let fileToRemove = [files[index]];
      state.files = files.filter(file => !fileToRemove.includes(file));
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getConversations.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(open_create_conversation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(open_create_conversation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activeConversation = action.payload;
      })
      .addCase(open_create_conversation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getConversationMessages.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getConversationMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(getConversationMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = [...state.messages, action.payload];
        let conversation = {
          ...action.payload.conversation,
          latestMessage: action.payload
        };
        let newConvos = [...state.conversations].filter(
          c => c._id !== conversation._id
        );
        newConvos.unshift(conversation);
        state.conversations = newConvos;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export const {
  setActiveConversation,
  updateMessagesAndConversations,
  addFiles,
  clearFiles,
  removeFileFromFiles
} = chatSlice.actions;
export default chatSlice.reducer;
