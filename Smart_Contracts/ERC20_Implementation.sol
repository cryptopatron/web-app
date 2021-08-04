// ----------------------------------------------------------------------------
// Implementation of ERC20 Standard. Useful for testing
// ----------------------------------------------------------------------------
contract DAI {
    string public _symbol;
    string public _name;
    uint8 public _decimals;
    uint public _totalSupply;

    // For each person map between their address and the number of tokens they have
    mapping(address => uint) balances;
    // To transfer erc20 token, give contract permission to transfer. Maps from your address to address of transfer target and amount to transfer.
    mapping(address => mapping(address => uint)) allowed;


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(string memory symbol, string memory name, uint8 decimals) {
        _symbol = symbol;
        _name = name;
        _decimals = decimals;
        _totalSupply = 0;
    }

    //Returns decimals that this token uses.
    function decimals() public view returns (uint8) {
        return _decimals;
    }


    //Returns the token name
    function name() public view returns (string memory) {
        return _name;
    }


    //Returns the symbol
    function symbol() public view returns (string memory) {
        return _symbol;
    }


    // Return total supply
    function totalSupply() public view returns (uint) {
        return _totalSupply;
    }


    // Return the token balance for account tokenOwner
    function balanceOf(address _token_owner) public view returns (uint balance) {
        return balances[_token_owner];
    }


    // ------------------------------------------------------------------------
    // Transfer the balance from token owner's account to to account
    // - Owner's account must have sufficient balance to transfer
    // - 0 value transfers are allowed
    // ------------------------------------------------------------------------
    function transfer(address _to, uint _num_tokens) public returns (bool success) {
        require(_num_tokens <= balances[msg.sender], "You are trying to transfer more tokens than you have");

        balances[msg.sender] = balances[msg.sender] - _num_tokens;
        balances[_to] = balances[_to] + _num_tokens;
        emit Transfer(msg.sender, _to, _num_tokens);
        return true;
    }


    // ------------------------------------------------------------------------
    // Mint new tokens to a given _to address
    // ------------------------------------------------------------------------
    function mint(address _to, uint _num_tokens) public returns (bool success) {
        balances[_to] = balances[_to] + _num_tokens;
        emit Transfer(address(0), _to, _num_tokens);
        return true;
    }


    // ------------------------------------------------------------------------
    // Token owner can approve for spender to transferFrom(...) tokens
    // from the token owner's account
    //
    // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
    // recommends that there are no checks for the approval double-spend attack
    // as this should be implemented in user interfaces
    // ------------------------------------------------------------------------
    function approve(address spender, uint tokens) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }


    // ------------------------------------------------------------------------
    // Transfer tokens from the from account to the to account
    //
    // The calling account must already have sufficient tokens approve(...)-d
    // for spending from the from account and
    // - From account must have sufficient balance to transfer
    // - Spender must have sufficient allowance to transfer
    // - 0 value transfers are allowed
    // ------------------------------------------------------------------------
    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        balances[from] = balances[from] - tokens;
        allowed[from][msg.sender] = allowed[from][msg.sender] - tokens;
        balances[to] = balances[to] + tokens;
        emit Transfer(from, to, tokens);
        return true;
    }


    // ------------------------------------------------------------------------
    // Returns the amount of tokens approved by the owner that can be
    // transferred to the spender's account
    // ------------------------------------------------------------------------
    function allowance(address tokenOwner, address spender) public view returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }
}