<?php



class Loginlogout
{
    public function login(LoginRequest $request) {
        return response('login method');
        $credentials = $request->validated();

        if(!Auth::attempt($credentials)) {
            return response([
                'message' => 'Credentials are not valid'
            ], 422);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function logout(Request $request) {
        return response('inside logout auth controller');
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}

